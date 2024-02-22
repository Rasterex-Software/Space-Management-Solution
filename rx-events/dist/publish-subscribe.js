var PublishSubscribe = /** @class */ (function () {
    function PublishSubscribe() {
        this.key = 0;
        this.subscribers = {};
    }
    PublishSubscribe.prototype.subscribe = function (topic, subscriber) {
        if (topic in this.subscribers) {
            this.subscribers[topic][this.key] = subscriber;
        }
        else {
            this.subscribers[topic] = {};
            this.subscribers[topic][this.key] = subscriber;
        }
        return this.key++;
    };
    PublishSubscribe.prototype.publish = function (topic) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        for (var sub in this.subscribers[topic]) {
            try {
                (_a = this.subscribers[topic])[sub].apply(_a, args);
            }
            catch (e) {
                console.log(Error('Issue with subscriber ' + topic + '. ' + (e && e.message)));
            }
        }
    };
    PublishSubscribe.prototype.unsubscribe = function (topic, key) {
        if (key) {
            delete this.subscribers[topic][key];
        }
        else {
            delete this.subscribers[topic];
        }
    };
    PublishSubscribe.prototype.unsubscribeAll = function () {
        this.subscribers = {};
        this.key = 0;
    };
    return PublishSubscribe;
}());
export { PublishSubscribe };
