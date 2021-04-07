const express = require('express');
const ip = require("ip");
const app = express();
app.use(express.json());

// A simple store of IP records
let ipStore = [
    // {ip: "1.0.0.1", status: 'acquired'},
    // {ip: "1.0.0.24", status: 'available'}
];

// Welcome or Help message
app.get('/', (req, resp) => {
    resp.send("Welcome to Trillion IP Address Management REST API");
});

// Create IP store (**Create IP addresses**)
app.post('/trillion/create/cidr', (req, resp) => {
    let cidrBlock = req.body;
    console.log("In Create ip store cidrBlock is: ", cidrBlock);
    if (cidrBlock) {
        const cidr = cidrBlock.cidr;
        if (typeof cidr !== "string") {
            throw new Error("Expected a CIDR string");
        }

        const range = ip.cidrSubnet(cidr);
        const start = ip.toLong(range.networkAddress);
        const end = ip.toLong(range.broadcastAddress);

        for (let i = start; i <= end; i++) {
            let ipRec = {
                ip: ip.fromLong(i),
                status: "available"
            };
            ipStore.push(ipRec);
        }
        
        resp.send({count: ipStore.length});
    } else {
        console.error("No CIDR block sent.");
        throw new Error("No CIDR block sent.");
        // resp.send("No IP CIDR block sent.");
    }
});

// List all IPs (**List IP addresses**)
app.get('/trillion/list/ips', (req, resp) => {
    if (ipStore && ipStore.length > 0) {
        resp.send(ipStore);
    } else {
        console.error("IP store is empty.");
        throw new Error("IP store is empty.");
        // resp.send("IP store is empty.");
    }
});

// Acquire an ip (**Acquire an IP**)
app.get('/trillion/acquire/:ip', (req, resp) => {
    let recPos = null;
    if (ipStore) {
        const ipRecord = ipStore.find((record, index) => {
            if (record.ip === req.params.ip) {
                recPos = index;
                console.log("In Acquire an ip recPos is: ", recPos);
                return record;
            }
        });

        if (ipRecord) {
            ipRecord.status = "acquired";
            ipStore.slice(recPos, 1, ipRecord);
            resp.send(ipRecord);
        } else {
            resp.send(req.params.ip + " does not exist in IP store.");
        }
    } else {
        console.error("IP store does not exist.");
        throw new Error("IP store does not exist.");
    }
});

// Release an ip (**Release an IP**)
app.get('/trillion/release/:ip', (req, resp) => {
    let recPos = null;
    if (ipStore) {
        const ipRecord = ipStore.find((record, index) => {
            if (record.ip === req.params.ip) {
                recPos = index;
                console.log("In Release an ip recPos is: ", recPos);
                return record;
            }
        });

        if (ipRecord) {
            ipRecord.status = "available";
            ipStore.slice(recPos, 1, ipRecord);
            resp.send(ipRecord);
        } else {
            resp.send(req.params.ip + " does not exist in IP store.");
        }
    } else {
        console.error("IP store does not exist.");
        throw new Error("IP store does not exist.");
    }
});

// Count IPs (** Total Number of IPs **)
app.get('/trillion/ips/total', (req, resp) => {
    if (ipStore) {
        resp.send({count: ipStore.length});
    } else {
        console.error("IP store does not exist.");
        throw new Error("IP store does not exist.");
    }
});

// Available IPs count (** Number of IPs available **)
app.get('/trillion/ips/available', (req, resp) => {
    let availableRecords = [];
    if (ipStore) {
        availableRecords = ipStore.filter((record) => record.status === "available");
        if (availableRecords) {
            resp.send({count: availableRecords.length});
        }
    } else {
        console.error("IP store does not exist.");
        throw new Error("IP store does not exist.");
    }
});

// IPs in use count (** Number of IPs acquired **)
app.get('/trillion/ips/acquired', (req, resp) => {
    let acquiredRecords = [];
    if (ipStore) {
        acquiredRecords = ipStore.filter((record) => record.status === "acquired");
        if (acquiredRecords) {
            resp.send({count: acquiredRecords.length});
        }
    } else {
        console.error("IP store does not exist.");
        throw new Error("IP store does not exist.");
    }
});

port = process.env.PORT || 8080;
app.listen(port);

console.log("IP Address Management REST API server started on: ", port);
