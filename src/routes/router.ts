import { Router } from "express";
import ContactController from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const router = Router();

// User Routes
const userController = new UserController();
router.post("/user", (req, res) => {
  userController.createUser(req, res);
});

router.get("/user", ensureAuthenticated, (req, res) => {
  userController.getUsers(req, res);
});

router.get("/user/:id", ensureAuthenticated, (req, res) => {
  userController.getUser(req, res);
});

router.patch("/user/:id", ensureAuthenticated, (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/user/:id", ensureAuthenticated, (req, res) => {
  userController.deleteUser(req, res);
});

router.post("/user/login", (req, res) => {
  userController.loginUser(req, res);
});

// Contact Routes
const contactController = new ContactController();

router.post("/contact", ensureAuthenticated, (req, res) => {
  contactController.createContact(req, res);
});

router.get("/contact/:id", ensureAuthenticated, (req, res) => {
  contactController.getContacts(req, res);
});

router.patch("/contact/:id", ensureAuthenticated, (req, res) => {
  contactController.updateContact(req, res);
});

router.delete("/contact/:id", ensureAuthenticated, (req, res) => {
  contactController.deleteContact(req, res);
});

export default router;
