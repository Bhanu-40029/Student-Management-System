import StudentLayout from "../student module/StudentLayout";
import "../style/style.css";
import TeacherLayout from "./TeacherLayout";
function TeacherAnnouncements({ announcements }){
    return(
        <>
         <  TeacherLayout>
      <div className="page-inner">
        <h2>Announcements</h2>

        <div className="announcement-list">
          {announcements && announcements.length > 0 ? (
            announcements.map(item => (
              <div className="announcement-card" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <span className="announcement-date">{item.date}</span>
              </div>
            ))
          ) : (
            <p>No announcements yet</p>
          )}
        </div>
      </div>
    </TeacherLayout>
        
        </>
    )
}
export default TeacherAnnouncements;
