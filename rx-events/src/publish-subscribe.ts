
export interface IPublishSubscribe {
    subscribe(topic: string, subscriber: (...args: any) => void): number;
    publish(topic: string, ...args: any): void;
    unsubscribe(topic: string, key: number): void;
    unsubscribeAll(): void;
}

export class PublishSubscribe implements IPublishSubscribe {
    private key = 0;
    private subscribers: any = {};

    public subscribe(topic: string, subscriber: (...args: any) => void): number {
        if (topic in this.subscribers) {
            this.subscribers[topic][this.key] = subscriber;
        } else {
            this.subscribers[topic] = {};
            this.subscribers[topic][this.key] = subscriber;
        }

        return this.key++;
    }

    public publish(topic: string, ...args: any) {
        for (const sub in this.subscribers[topic]) {
            try {
                this.subscribers[topic][sub](...args);
            } catch (e) {
                console.log(
                    Error('Issue with subscriber ' + topic + '. ' + (e && e.message)),
                );
            }
        }
    }

    public unsubscribe(topic: string, key: number) {
        if (key) {
            delete this.subscribers[topic][key];
        } else {
            delete this.subscribers[topic];
        }
    }

    public unsubscribeAll() {
        this.subscribers = {};
        this.key = 0;
    }
}
