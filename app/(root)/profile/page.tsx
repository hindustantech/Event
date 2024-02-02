import Collection from '@/components/Shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const organizedEvent = await getEventsByUser({ userId, page: 1 })

    return (
        <>
            {/* my Tickets */}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'> My Tickets</h3>
                    <Button asChild className="button hidden sm:flex">
                        <Link href="/#Event"> Explore More now </Link>
                    </Button>
                </div>
            </section>
            {/* 
    <section className='wrapper my-8'>
        <Collection
          data={events?.data}
          emptyTitle="No Event Ticket Purchased "
          emptyStateSubtext="No worries - plenty of exiciting  events to Explore !"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlPramsName="orderPage"
          totalPages={2}
           />
        </section> */}

            {/* Event organized */}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>  Event OrganiZed</h3>
                    <Button asChild className="button hidden sm:flex">
                        <Link href="/event/create"> Create event </Link>
                    </Button>
                </div>
            </section>



            <section className='wrapper my-8'>
                <Collection
                    data={organizedEvent?.data}
                    emptyTitle="No Event Created yet"
                    emptyStateSubtext="Create Event "
                    collectionType="Events_Organized"
                    limit={6}
                    page={1}
                    urlParamName="eventsPage"
                    totalPages={2}
                />
            </section>



        </>
    )
}

export default ProfilePage