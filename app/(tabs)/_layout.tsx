import { SymbolView } from 'expo-symbols';
import { Link, Tabs } from 'expo-router';
import { Platform, Pressable } from 'react-native';

import { colors } from '@/src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { fontWeight: '600', color: colors.text },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chart.pie.fill',
                android: 'home',
                web: 'home',
              }}
              tintColor={color}
              size={26}
            />
          ),
          headerRight: () => (
            <Link href="/add" asChild>
              <Pressable style={{ marginRight: 16 }}>
                {({ pressed }) => (
                  <SymbolView
                    name={{ ios: 'plus.circle.fill', android: 'add', web: 'add' }}
                    size={28}
                    tintColor={colors.primary}
                    style={{ opacity: pressed ? 0.6 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'list.bullet',
                android: 'list',
                web: 'list',
              }}
              tintColor={color}
              size={26}
            />
          ),
          headerRight: () => (
            <Link href="/add" asChild>
              <Pressable style={{ marginRight: 16 }}>
                {({ pressed }) => (
                  <SymbolView
                    name={{ ios: 'plus.circle.fill', android: 'add', web: 'add' }}
                    size={28}
                    tintColor={colors.primary}
                    style={{ opacity: pressed ? 0.6 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
