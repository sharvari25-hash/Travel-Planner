package com.wanderwise.wanderwise_backend.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAllByOrderByIdAsc();

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
