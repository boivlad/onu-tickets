export function getNonRefundedTickets([buyTickets, refundTickets]) {
  const refundedIds = refundTickets.map(ticket => ticket.tokenId + '_' + ticket.eventId);
  return buyTickets.filter(ticket => !refundedIds.includes(ticket.tokenId + '_' + ticket.eventId));
}
