import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // Still resolving Firebase auth state — show a centred spinner
  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 dark:bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
