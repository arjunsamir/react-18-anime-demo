import React from "react"

const Dashboard = ({ children }) => {

  return (
    <main className="dashboard">

      <div className="dashboard__menu"></div>
      
      <main className="dashboard__main">
        {children}
      </main>

      <div className="dashboard__actions"></div>

    </main>
  )

}

export default Dashboard