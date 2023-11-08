export function classifyAndSortTickets(buyTickets, refundTickets, currentDate) {
  // Helper function to check if a ticket is refunded
  function isRefunded(ticket) {
    return refundTickets.some(refundTicket =>
      refundTicket.tokenId === ticket.tokenId && refundTicket.eventId === ticket.eventId
    );
  }

  // Loop through the tickets and classify them
  const classifiedTickets = buyTickets.map(ticket => {
    if (isRefunded(ticket)) {
      return { ...ticket, status: 'REFUND' };
    } else if (parseInt(ticket.event.ticketInfo_dateStart) > currentDate) {
      return { ...ticket, status: 'ACTUAL' };
    } else {
      return { ...ticket, status: 'EXPIRED' };
    }
  });

  // Sort the tickets based on their classification
  classifiedTickets.sort((a, b) => {
    const order = ['ACTUAL', 'EXPIRED', 'REFUND'];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  return classifiedTickets;
}
