import express, { Request, Response } from 'express';
const router = express.Router();

/* GET users */
router.get('/', (req: Request, res: Response) => {
  res.send('respond with a resource');
});

module.exports = router;
