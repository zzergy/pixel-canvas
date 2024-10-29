"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing json request payloads
app.use(express_1.default.urlencoded({ extended: true })); // for parsing url encoded data
app.use((0, cors_1.default)()); // allows requests from other domains
app.use((0, morgan_1.default)("dev")); //for logging the requests to the console
// Get the port from the env file
const PORT = process.env.PORT;
// Create a basic route
app.get("/", (req, res) => {
    try {
        return res.status(200).json({ message: "Am i really working :o ???" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Wrong route handler
app.use((req, res) => {
    return res.status(404).json({ message: "Route not found! :(" });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map