import * as express from 'express';
import * as root from './routing/root';

/**
 * Bring all routes here.
 */

const router = express.Router();

router.use(root);

export = router;
