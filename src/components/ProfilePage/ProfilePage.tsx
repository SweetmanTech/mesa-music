"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useUser } from "@/context/UserProvider";
import { TUser } from "../LoginButton/LoginButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";

const ProfilePage = () => {
  const { push } = useRouter();
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<TUser | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user: initialUser, updateUser, fetchUser } = useUser();

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedUserData: TUser = {
        ...user!,
        userId: address,
      };

      await updateUser(updatedUserData);

      console.log("User saved:", updatedUserData);
      setEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setEditable(false);
    setUser(initialUser);
  };

  const handleInputChange = (field: keyof TUser, value: string) => {
    setUser((prevUser) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
  }, [isConnected]);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    if (!initialUser && address) {
      fetchUser();
    }
  }, [
    initialUser?.avatar_url,
    initialUser?.full_name,
    initialUser?.username,
    initialUser?.website,
    address,
  ]);

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>
        <ProfileAvatar editable={editable} />
        <ProfileDetails
          editable={editable}
          handleInputChange={handleInputChange}
          loading={loading}
          onCancel={onCancel}
          onSave={onSave}
          setEditable={setEditable}
          user={user}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
