export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: "";
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}