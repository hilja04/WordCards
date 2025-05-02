import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SQLiteProvider } from 'expo-sqlite';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import DeckScreen from './components/DeckScreen';
import SearchScreen from './components/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigation for Decks tab
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#26002B'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    >
      <Stack.Screen name="DecksList" component={HomeScreen} options={{ title: 'Decks' }} />
      <Stack.Screen
        name="DeckDetails"
        component={DeckScreen}
        options={({ route }) => ({ title: route.params.deck.title })}
      />
    </Stack.Navigator>

  );
}

// Bottom tab navigation 
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D81B60',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {backgroundColor: '#26002B',borderColor: 'black'},
      })}
    >
      <Tab.Screen
        name="Decks"
        component={HomeStackNavigator}
        options={{ headerShown: false }} 
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true, 
          headerStyle: { backgroundColor: '#26002B' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Tab.Navigator>
  );
}


// Initializer for the database
const initializeDatabase = async (db) => {
  try {
    // Create Deck table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS deck (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        description TEXT
      );
    `);

    // Create Card table linked to Deck
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS card (
        id INTEGER PRIMARY KEY NOT NULL,
        deck_id INTEGER NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY (deck_id) REFERENCES deck (id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.error('Could not initialize database', error);
  }
};

// App component with SQLiteProvider and Navigation setup
export default function App() {
  return (
    <SQLiteProvider
      databaseName="deckdb.db"
      onInit={initializeDatabase}
      onError={(error) => console.error('Database error:', error)}
    >
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SQLiteProvider>
  );
}
