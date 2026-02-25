import { AbstractNotificationProviderService, MedusaError } from "@medusajs/framework/utils"
import { ProviderSendNotificationResultsDTO, ProviderSendNotificationDTO, Logger } from "@medusajs/framework/types"
import { Resend } from "resend"

type InjectedDependencies = {
    logger: Logger
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "resend"
    protected logger_: Logger
    protected resend_: Resend

    constructor({ logger }: InjectedDependencies, options: any) {
        super()
        this.logger_ = logger
        this.resend_ = new Resend(options.api_key)
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        if (!notification.to) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `No destination email provided`
            )
        }

        try {
            const emailOptions = {
                from: 'Mbengsend <onboarding@resend.dev>', // You should change this to a verified domain in production
                to: notification.to,
                subject: notification.template || 'Notification from Mbengsend',
                html: (notification.data?.html as string) || '<p>You have a new notification from Mbengsend.</p>',
            }

            const { data, error } = await this.resend_.emails.send(emailOptions)

            if (error) {
                this.logger_.error(`Resend Email Error: ${error.message}`)
                return {}
            }

            this.logger_.info(`Email successfully sent to ${notification.to}`)
            return {}

        } catch (e) {
            this.logger_.error(`Email Error: ${e}`)
            return {}
        }
    }
}

export default ResendNotificationProviderService
