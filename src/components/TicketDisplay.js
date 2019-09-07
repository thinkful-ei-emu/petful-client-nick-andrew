import React from 'react';


class TicketDisplay extends React.Component{

  


  makeTicketItems(tickets){
     return tickets.map(ticket => {
      return <li key={ticket.id}>{ticket.username}</li>
    })
  }

  render(){
    
    if(this.props.loaded){
      let ticketItems = this.makeTicketItems(this.props.tickets)
      return (
        <div className='ticket-display'>
          <ul>
            {ticketItems}
          </ul>
        </div>
      )
    } else {
      return (
        <p>Tickets loading</p>
        )
    }
  }
}

export default TicketDisplay;