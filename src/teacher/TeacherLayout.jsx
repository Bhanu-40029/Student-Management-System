import Layout from "../components/Layout";
import TeacherSidebar from "./TeacherSidebar";

function TeacherLayout({ children }) {
  return (
    <Layout>
      <div className="app-body">

        <TeacherSidebar />

        <div className="page-content">
          <div className="page-inner">
            {children}
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default TeacherLayout;