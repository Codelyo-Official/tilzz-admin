import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import styles from "./accountPage.module.css";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type FormData = {
  name: string;
  email: string;
};

export default function Account() {
  console.log("account rendered");

  const { register, handleSubmit } = useForm<FormData>();
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(user.avatar);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUser((prev) => ({ ...prev, ...data, avatar: image }));
    setOpen(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDeleteAccount = () => {
    // if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
    //   alert("Account deleted!");
    // }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h2>Profile Settings</h2>
        <div className={styles.profileAvatar}>
          <img src={user.avatar} alt="Profile" className={styles.avatarImg} />
        </div>
        <button className={styles.editBtn} onClick={() => setOpen(true)}>
          Edit Profile
        </button>
        {open && (
          <div className={styles.modal} style={{ fontSize: "14px" }}>
            <div className={styles.modalContent}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.uploadLabel}>
                  <Upload size={18} /> Upload New Photo
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
                {image && <img src={image} alt="New" className={styles.previewImg} />}
                <label>Name</label>
                <input
                  {...register("name")}
                  defaultValue={user.name}
                  className={styles.inputField}
                />
                <label>Email</label>
                <input
                  {...register("email")}
                  defaultValue={user.email}
                  type="email"
                  className={styles.inputField}
                />
                <button type="submit" className={styles.saveBtn}>
                  Save Changes
                </button>
              </form>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        <button className={styles.deleteBtn} onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
