const express = require("express");
const cors = require("cors");
const passSchema = require("./models/passmodel");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const newPass = await passSchema.create({
            url: req.body.url,
            username: req.body.username,
            password: req.body.password,
        });
        res.status(201).send({ success: true, data: newPass });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

app.get("/", async (req, res) => {
    try {
        const data = await passSchema.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

app.delete("/", async (req, res) => {
    try {
        const deletedPass = await passSchema.findOneAndDelete(req.body);
        if (!deletedPass) {
            return res.status(404).send({ success: false, message: "Entry not found" });
        }
        res.status(200).send({ success: true, message: "Entry deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
