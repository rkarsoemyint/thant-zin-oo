import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // npm install react-firebase-hooks

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  
  if (!user) {
    
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;