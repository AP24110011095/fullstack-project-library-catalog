const Section = ({ title, children }) => (
  <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-7">
    <h2 className="mb-4 text-xl font-bold text-pink-300 md:text-2xl">{title}</h2>
    <div className="space-y-2 text-sm leading-7 text-slate-200 md:text-base">{children}</div>
  </section>
);

const ProjectReportPage = () => {
  return (
    <div className="space-y-6 rounded-3xl bg-[#08090f] p-4 md:p-8">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-r from-indigo-900 to-slate-900 p-6">
        <h1 className="text-2xl font-black tracking-wide text-white md:text-4xl">Library Book Catalog System</h1>
        <p className="mt-2 text-slate-200">Full Stack MERN Project Report View</p>
      </header>

      <Section title="1. Introduction">
        <p>
          Library Book Catalog System is a digital library platform where users search, borrow, and return books online,
          while admins manage the catalog and borrowing activity.
        </p>
      </Section>

      <Section title="2. Core Modules">
        <ul className="list-disc space-y-1 pl-5">
          <li>User authentication (register/login with JWT)</li>
          <li>Book search by title, author, category, branch, year</li>
          <li>Borrow and return workflow with due-date tracking</li>
          <li>User dashboard and separate admin dashboard</li>
          <li>Admin book CRUD and borrow-monitoring panel</li>
        </ul>
      </Section>

      <Section title="3. Technical Architecture">
        <p>Frontend (React) → Backend APIs (Node + Express) → Database (MongoDB).</p>
        <img
          src="/technical-architecture.png"
          alt="Library technical architecture diagram"
          className="mt-4 w-full rounded-xl border border-slate-700"
        />
      </Section>

      <Section title="4. User and Admin Flow">
        <p>User: Search Book → View Details → Borrow Book → Track Due Date → Return Book</p>
        <p>Admin: Login → Add/Update/Delete Books → Monitor Borrow Records</p>
        <img
          src="/mvc-pattern.png"
          alt="Library MVC pattern diagram"
          className="mt-4 w-full rounded-xl border border-slate-700"
        />
      </Section>

      <Section title="5. ER Diagram">
        <p>Entities: Student/User, Admin, Book, BorrowRecord with 1:N relationships and foreign-key linkage.</p>
        <img src="/er-diagram.png" alt="Library ER diagram" className="mt-4 w-full rounded-xl border border-slate-700" />
      </Section>

      <Section title="6. Technology Stack">
        <ul className="list-disc space-y-1 pl-5">
          <li>Frontend: React.js, Tailwind CSS, Axios, React Router</li>
          <li>Backend: Node.js, Express.js</li>
          <li>Database: MongoDB with Mongoose</li>
          <li>Security: JWT authentication, bcrypt password hashing</li>
        </ul>
      </Section>

      <Section title="7. Learning Outcomes">
        <ul className="list-disc space-y-1 pl-5">
          <li>End-to-end MERN application development</li>
          <li>REST API design with role-based access control</li>
          <li>Database schema modeling and CRUD operations</li>
          <li>Dashboard UX and search/filter implementation</li>
        </ul>
      </Section>
    </div>
  );
};

export default ProjectReportPage;
