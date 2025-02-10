import { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import "./AccountPage.css";

export default function Account() {
  console.log("account rendered")
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/100",
  });

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(user.avatar);

  const onSubmit = (data) => {
    setUser((prev) => ({ ...prev, ...data, avatar: image }));
    setOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
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
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Settings</h2>
        <div className="profile-avatar">
          <img src={user.avatar} alt="Profile" className="avatar-img" />
        </div>
        <button className="edit-btn" onClick={() => setOpen(true)}>Edit Profile</button>
        {open && (
          <div className="modal" style={{fontSize:"14px"}}>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="upload-label">
                  <Upload size={18} /> Upload New Photo
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
                {image && <img src={image} alt="New" className="preview-img" />}
                <label>Name</label>
                <input {...register("name")} defaultValue={user.name} className="input-field" />
                <label>Email</label>
                <input {...register("email")} defaultValue={user.email} type="email" className="input-field" />
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
              <button className="close-btn" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        )}
        <button className="delete-btn" onClick={handleDeleteAccount}>
           Delete Account
        </button>
      </div>
    </div>
  );
}
