
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SQLiteProvider } from 'expo-sqlite';
import HomeScreen from './components/HomeScreen';
import DeckPage from './components/DeckPage';
const Stack = createStackNavigator();

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

export default function App() {
  return (
    <SQLiteProvider
    databaseName="deckdb.db"
    onInit={initializeDatabase}
    onError={(error) => console.error('Database error:', error)}
  >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Decks" component={HomeScreen} />
        <Stack.Screen 
          name="DeckPage" 
          component={DeckPage} 
          options={({ route }) => ({ title: route.params.deck.title })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SQLiteProvider>
  );
}

