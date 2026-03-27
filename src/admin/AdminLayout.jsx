import Layout from "../components/Layout";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <Layout>
      <AdminSidebar />

      <div className="page-content">
        <div className="page-inner">
          {children}
        </div>
      </div>
    </Layout>
  );
}

export default AdminLayout;