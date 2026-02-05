import React, { useState } from 'react';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import TravelerHeader from '../components/dashboard/traveler/TravelerHeader';
import TabButton from '../components/settings/TabButton';
import UserProfileSection from '../components/settings/UserProfileSection';
import ApplicationSettingsForm from '../components/settings/ApplicationSettingsForm';
import RegionalPreferences from '../components/settings/RegionalPreferences';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');

  return (
    <div className="flex min-h-screen bg-[#F3F6FD] font-sans">
      <SettingsSidebar />
      <main className="flex-1 flex flex-col">
        <TravelerHeader />
        <div className="p-8 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="flex gap-8 border-b border-gray-200 mb-8">
                {['Account', 'Security', 'Preferences', 'Notifications'].map((tab) => (
                    <TabButton 
                        key={tab} 
                        text={tab} 
                        active={activeTab === tab} 
                        onClick={() => setActiveTab(tab)} 
                    />
                ))}
            </div>

            <UserProfileSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ApplicationSettingsForm />
                <RegionalPreferences />
            </div>
        </div>
      </main>
    </div>
  );
}