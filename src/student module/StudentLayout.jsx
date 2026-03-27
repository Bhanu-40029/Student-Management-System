import Layout from "../components/Layout";
import StudentSidebar from "./StudentSidebar";

function StudentLayout({ children }) {
  return (
    <Layout>
      <StudentSidebar />
      <div className="page-content">
        <div className="page-inner">
          {children}
        </div>
      </div>
    </Layout>
  );
}
export default StudentLayout;