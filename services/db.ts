
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { db } from "../firebase";
import { User, UserRole, ScoutTier } from "../types";

const USERS_COLLECTION = "users";
const SESSION_KEY = "nujoom_user_id";

export const dbService = {
  /**
   * Register a new user in Firestore
   */
  register: async (name: string, phone: string, role: UserRole): Promise<User> => {
    const userData = {
      name,
      phone,
      role,
      tier: role === UserRole.SCOUT ? ScoutTier.FREE : null,
      createdAt: serverTimestamp(),
      status: 'Active'
    };

    const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);
    
    const newUser: User = {
      id: docRef.id,
      ...userData,
      createdAt: Date.now(), // Local representation for immediate UI
      status: 'Active'
    } as User;

    localStorage.setItem(SESSION_KEY, docRef.id);
    return newUser;
  },

  /**
   * Find a user by phone number for login
   */
  login: async (phone: string): Promise<User | null> => {
    const q = query(collection(db, USERS_COLLECTION), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    const user: User = {
      id: userDoc.id,
      ...userData,
      createdAt: userData.createdAt?.toMillis?.() || Date.now()
    } as User;

    localStorage.setItem(SESSION_KEY, user.id);
    return user;
  },

  /**
   * Restore user session from localStorage ID
   */
  getCurrentUser: async (): Promise<User | null> => {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;

    try {
      const docRef = doc(db, USERS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        return {
          id: docSnap.id,
          ...userData,
          createdAt: userData.createdAt?.toMillis?.() || Date.now()
        } as User;
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
    }
    
    return null;
  },

  /**
   * Clear local session
   */
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
