import StudentLayout from "./StudentLayout";
import "../style/style.css";
function Announcements({ announcements }){
    return(
        <>
          <StudentLayout>
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
    </StudentLayout>
        </>
    )
}
export default Announcements;