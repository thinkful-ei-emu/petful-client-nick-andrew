import React from 'react';
import '../styles/TicketDisplay.css';


class TicketDisplay extends React.Component {
  makeTicketItems(tickets) {
    return tickets.map(ticket => {
      return <li key={ticket.id} className='ticket-item'>{ticket.username}</li>;
    });
  }

  render() {

    if (this.props.loaded) {
      let ticketItems = this.makeTicketItems(this.props.tickets);
      if (!this.props.tickets || this.props.tickets === []){
        return (
          <div className='ticket-display-container'>
            <div className='ticket-display'>
              <p className='ticket-header'>Tickets:</p>
              <ul className='ticket-list'>
                <li className='ticket-item loading'>Loading</li>
              </ul>
            </div>
          </div>
        );
      }
      return (
        <div className='ticket-display-container'>
          <div className='ticket-display'>
            <p className='ticket-header'>Tickets:</p>
            <ul className='ticket-list'>
              {ticketItems}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <p>Tickets loading</p>
      );
    }
  }
}

export default TicketDisplay;