import DashboardLayout from "../../components/DashboardLayout";
import MainContent from "../../components/MainDashboardContent";
import Footer from "../../components/Footer";

const Profile = () => {
    console.log("profile component rendered");
    return (
        <>
            <DashboardLayout>
                <MainContent />
            </DashboardLayout>
            <Footer />
        </>
    );
}

export default Profile;
