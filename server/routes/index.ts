import * as express from 'express';
import * as root from './routing/root';

const router = express.Router();

router.use(root);

export = router;
