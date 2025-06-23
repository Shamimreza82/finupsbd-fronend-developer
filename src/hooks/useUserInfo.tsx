import { useState, useEffect } from "react";
import { userInfo } from "@/services/UserData";

export function useUserInfo() {
  const [user, setUser] = useState<any>(null);
  const [isloading, setisLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setisLoading(true);
        const { data } = await userInfo();
        setUser(data);
      } catch (err) {
        setError("Failed to load user profile");
        console.error(err);
      } finally {
        setisLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, isloading, error, setisLoading, setError };
}
