import express from 'express';
import { register, login, getUserJoin } from '../controllers/auth';
import { requestReimbursements, getReimbursements, updateReimbursments, getReimburse, getImage, getReimburseWithUser, getReimbursementsForSuper } from '../controllers/reimburse';
import { upload } from '../utils/uploadFile';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/usertest', getUserJoin);

router.post('/reimbursements/super/get', getReimbursementsForSuper);
router.post('/reimbursements/request', requestReimbursements);
router.patch('/reimbursements/approve', updateReimbursments);
router.post('/reimburse/get/init', getReimburseWithUser)
router.get('/reimbursements/get', getReimbursements);
router.post('/reimburse/get', getReimburse)

router.get('/image/:filename', getImage);
router.post('/upload', upload.array('files'), (req:any, res:any) => {

    res.send({
        success: true,
        message: 'Files uploaded successfully',
        files: req.files
      });
});

export default router;