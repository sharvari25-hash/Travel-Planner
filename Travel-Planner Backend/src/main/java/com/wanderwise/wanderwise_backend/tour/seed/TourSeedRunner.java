package com.wanderwise.wanderwise_backend.tour.seed;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wanderwise.wanderwise_backend.tour.Tour;
import com.wanderwise.wanderwise_backend.tour.TourRepository;
import com.wanderwise.wanderwise_backend.tour.TourWeatherProfile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class TourSeedRunner implements CommandLineRunner {

    private final TourRepository tourRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${app.tours.seed-js-path:../Travel-Planner Frontend/src/lib/AllToursData.js}")
    private String toursSeedJsPath;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        List<TourSeedItem> seedItems = readSeedItems();
        if (seedItems.isEmpty()) {
            log.warn("No tours loaded from seed/all-tours.json");
            return;
        }

        Map<String, Tour> existingBySlug = new HashMap<>();
        for (Tour tour : tourRepository.findAll()) {
            existingBySlug.put(tour.getSlug(), tour);
        }

        int upsertCount = 0;
        for (TourSeedItem item : seedItems) {
            String slug = Tour.buildSlug(item.destination(), item.country());
            Tour tour = existingBySlug.getOrDefault(slug, new Tour());

            tour.setSlug(slug);
            tour.setDestination(item.destination());
            tour.setCountry(item.country());
            tour.setCategory(item.category());
            tour.setDescription(item.description());
            tour.setDuration(item.duration());
            tour.setImg(item.img());
            tour.setPlan(item.plan() != null ? new ArrayList<>(item.plan()) : new ArrayList<>());
            tour.setWeatherProfile(toWeatherProfile(item.weatherProfile()));

            tourRepository.save(tour);
            upsertCount += 1;
        }

        log.info("Tours seed sync complete. Upserted {} records from AllToursData seed.", upsertCount);
    }

    private List<TourSeedItem> readSeedItems() throws IOException {
        List<TourSeedItem> fromFrontendJs = readSeedItemsFromFrontendJs();
        if (!fromFrontendJs.isEmpty()) {
            log.info("Loaded {} tours from frontend seed file: {}", fromFrontendJs.size(), toursSeedJsPath);
            return fromFrontendJs;
        }

        Resource resource = new ClassPathResource("seed/all-tours.json");
        if (!resource.exists()) {
            return List.of();
        }

        try (InputStream inputStream = resource.getInputStream()) {
            List<TourSeedItem> fallbackSeed = objectMapper.readValue(inputStream, new TypeReference<>() {
            });
            log.info("Loaded {} tours from fallback seed/all-tours.json", fallbackSeed.size());
            return fallbackSeed;
        }
    }

    private List<TourSeedItem> readSeedItemsFromFrontendJs() throws IOException {
        Path jsPath = Paths.get(toursSeedJsPath).normalize();
        if (!Files.exists(jsPath)) {
            return List.of();
        }

        String fileContent = Files.readString(jsPath);
        int exportStart = fileContent.indexOf("export const allToursData");
        if (exportStart < 0) {
            return List.of();
        }

        int arrayStart = fileContent.indexOf('[', exportStart);
        int arrayEnd = fileContent.indexOf("];", arrayStart);
        if (arrayStart < 0 || arrayEnd < 0) {
            return List.of();
        }

        String arrayContent = fileContent.substring(arrayStart, arrayEnd + 1);
        ObjectMapper relaxedMapper = objectMapper.copy();
        relaxedMapper.getFactory().configure(JsonReadFeature.ALLOW_JAVA_COMMENTS.mappedFeature(), true);
        relaxedMapper.getFactory().configure(JsonReadFeature.ALLOW_SINGLE_QUOTES.mappedFeature(), true);
        relaxedMapper.getFactory().configure(JsonReadFeature.ALLOW_UNQUOTED_FIELD_NAMES.mappedFeature(), true);
        relaxedMapper.getFactory().configure(JsonReadFeature.ALLOW_TRAILING_COMMA.mappedFeature(), true);

        return relaxedMapper.readValue(arrayContent, new TypeReference<>() {
        });
    }

    private TourWeatherProfile toWeatherProfile(TourSeedItem.WeatherProfileSeed weatherProfile) {
        if (weatherProfile == null) {
            return TourWeatherProfile.builder()
                    .baseTemp(20)
                    .baseHumidity(50)
                    .baseWind(10)
                    .defaultCondition("Partly Cloudy")
                    .build();
        }

        return TourWeatherProfile.builder()
                .baseTemp(weatherProfile.baseTemp())
                .baseHumidity(weatherProfile.baseHumidity())
                .baseWind(weatherProfile.baseWind())
                .defaultCondition(weatherProfile.defaultCondition())
                .build();
    }
}
