import { gql } from "graphql-tag"

export const SELECT_ACTUAL_EVENTS = gql`
    query createEvents(
        $where: CreateEvent_filter!
    ) {
        createEvents(where: $where) {
            eventId
            eventAddress
            organizer,
            ticketInfo_uri
            ticketInfo_name
            ticketInfo_price
            ticketInfo_amount
            ticketInfo_dateStart
            ticketInfo_dateEnd
            blockTimestamp
        }
    }
`

export const SELECT_ACTUAL_EVENTS_BY_BUYER = gql`
    query BuyTickets($where: BuyTicket_filter!) {
        buyTickets(where: $where) {
            buyer
            tokenId
            eventId
            event {
                id
                eventAddress
                ticketInfo_price
                ticketInfo_uri
                ticketInfo_name
                ticketInfo_amount
                ticketInfo_dateStart
                ticketInfo_dateEnd
            }
        }
        refundTickets(where: $where) {
            buyer
            tokenId
            eventId
            event {
                id
                eventAddress
                ticketInfo_price
                ticketInfo_uri
                ticketInfo_name
                ticketInfo_amount
                ticketInfo_dateStart
                ticketInfo_dateEnd
            }
        }
    }
`
