import { EnvelopeOpen } from "@phosphor-icons/react"

const Inbox = () => {
    return (
        <div className="flex items-center justify-center text-center py-[100px]">
            <div>
                <EnvelopeOpen className="mx-auto" size={70} weight="thin"/>
                <p className="text-center">You have no new message. <br /> You will get a notification when you get one</p>
            </div>
        </div>
    )
}

export default Inbox