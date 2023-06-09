import dbCommon from '../common/db.common.js';
import {TicketEntity} from '../entities/tickets.entity.js';
import {type PartialTicket} from '../common/types/tickets.types.js';
import connection from '../datasource/db.datasource.js';

export async function findTicketById(id: number) {
    try {
        const result = await dbCommon.entityManager.findOne(TicketEntity, {
            where: {id},
        });

        return result ? result : undefined;
    } catch (err) {
        console.log('Error occurred while finding ticket by ID:', err);
        throw err;
    }
}

export async function findAllTickets(
    filter?: PartialTicket,
    page?: number,
    limit?: number,
) {
    const query = connection.createQueryBuilder(TicketEntity, 'Ticket');

    if (filter?.status) {
        query.andWhere('Ticket.status = :status', {status: filter.status});
    }

    if (filter?.from) {
        query.andWhere('Ticket.from = :from', {from: filter.from});
    }

    if (filter?.text) {
        query.andWhere('Ticket.text LIKE :text', {text: `%${filter.text}%`});
    }

    if (filter?.title) {
        query.andWhere('Ticket.title LIKE :title', {title: `%${filter.title}%`});
    }

    if (filter?.insertURL) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query.andWhere('Ticket.insertURL = :insertURL', {insertURL: filter.insertURL});
    }

    if (filter?.userId) {
        query.andWhere('Ticket.userId = :userId', {userId: filter.userId});
    }

    if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
    }

    return query.getMany();
}

export async function createTicket(ticket: TicketEntity) {
    const createdTicket = dbCommon.entityManager.create(TicketEntity, ticket);

    return dbCommon.entityManager.save(createdTicket);
}

export async function updateTicket(ticket: TicketEntity) {
    const existingTicket = await findTicketById(ticket.id);

    if (!existingTicket) {
        throw new Error(`Ticket with ID ${ticket.id} does not exist.`);
    }

    existingTicket.title = ticket.title;
    existingTicket.from = ticket.from;
    existingTicket.text = ticket.text;
    existingTicket.insertURL = ticket.insertURL;
    existingTicket.status = ticket.status;
    existingTicket.userId = ticket.userId;

    return dbCommon.entityManager.save(existingTicket);
}

export async function deleteTicket(ticketId: number) {
    const ticketToDelete = await findTicketById(ticketId);

    if (!ticketToDelete) {
        throw new Error(`Ticket with ID ${ticketId} does not exist.`);
    }

    await dbCommon.entityManager.remove(ticketToDelete);
}
