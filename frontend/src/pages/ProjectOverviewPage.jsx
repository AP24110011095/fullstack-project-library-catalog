const Section = ({ title, children }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-3 text-xl font-bold text-slate-900">{title}</h2>
    <div className="space-y-2 text-sm leading-6 text-slate-700">{children}</div>
  </section>
);

const ProjectOverviewPage = () => {
  return (
    <div className="space-y-5">
      <h1 className="serif-title text-4xl font-semibold text-slate-900">Library Book Catalog - Full Project Overview</h1>

      <Section title="1. Introduction">
        <p>
          This project is a web-based Library Book Catalog System built with MERN stack to digitalize searching,
          borrowing, returning, and management of books.
        </p>
      </Section>

      <Section title="2. Description">
        <ul className="list-disc pl-5">
          <li>Search books by title, author, category.</li>
          <li>View book details and availability.</li>
          <li>Borrow and return books online.</li>
          <li>Track due dates in user dashboard.</li>
          <li>Admin manages books and monitors records.</li>
        </ul>
      </Section>

      <Section title="3. Problem Statement">
        <p>
          Manual library operations are slow and error-prone. The project solves this by centralizing inventory,
          borrow tracking, and user access in one digital platform.
        </p>
      </Section>

      <Section title="4. Scenario">
        <p>
          A student searches a book, borrows it, tracks due date, and returns it. Admin adds/updates/deletes books
          and monitors who borrowed which book.
        </p>
      </Section>

      <Section title="5. Architecture">
        <img src="/technical-architecture.png" alt="Technical Architecture" className="w-full rounded-lg border border-slate-200" />
      </Section>

      <Section title="6. Project Flow (System Flow)">
        <ol className="list-decimal pl-5">
          <li>User registration/login</li>
          <li>Book search</li>
          <li>Book details</li>
          <li>Borrow book</li>
          <li>Track due date</li>
          <li>Return book</li>
          <li>Admin management</li>
        </ol>
      </Section>

      <Section title="7. User Flow">
        <p><strong>User:</strong> Search - View Details - Borrow - Track Due Date - Return</p>
        <p><strong>Admin:</strong> Login - Add/Update/Delete Books - Monitor Borrow Records</p>
      </Section>

      <Section title="8. ER Diagram">
        <img src="/er-diagram.png" alt="ER Diagram" className="w-full rounded-lg border border-slate-200" />
      </Section>

      <Section title="9. Pre-Requisites">
        <p>React basics, Node/Express basics, MongoDB & Mongoose, API testing with Postman.</p>
      </Section>

      <Section title="10. Required Technologies">
        <p>Frontend: React.js, Tailwind CSS, Axios, React Router</p>
        <p>Backend: Node.js, Express.js</p>
        <p>Database: MongoDB, Mongoose</p>
        <p>Security: JWT, bcrypt</p>
      </Section>

      <Section title="11. Collections">
        <p>Users, Books, BorrowRecords</p>
      </Section>

      <Section title="12. Key Features">
        <p>Book search, details, borrow/return, user dashboard, admin monitoring.</p>
      </Section>

      <Section title="13. Optional Advanced Features">
        <p>Fine calculation, reminders, recommendations, multi-branch support, QR issue/return.</p>
      </Section>

      <Section title="14. Learning Outcomes">
        <p>
          MERN full-stack implementation, CRUD APIs, authentication/authorization, schema design, dashboard and
          inventory workflows.
        </p>
      </Section>

      <Section title="MVC Pattern">
        <img src="/mvc-pattern.png" alt="MVC Pattern" className="w-full rounded-lg border border-slate-200" />
      </Section>
    </div>
  );
};

export default ProjectOverviewPage;
