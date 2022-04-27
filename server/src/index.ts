import { app } from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on PORT: 3000.`);
});