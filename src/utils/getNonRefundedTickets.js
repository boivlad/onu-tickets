export function getNonRefundedTickets([buyTickets, refundTickets]) {
  console.log('buyTickets', buyTickets)
  console.log('refundTickets', refundTickets)
  const refundedIds = refundTickets.map(ticket => ticket.tokenId + '_' + ticket.eventId);
  console.log(refundedIds)
  return buyTickets.filter(ticket => !refundedIds.includes(ticket.tokenId + '_' + ticket.eventId));
}
