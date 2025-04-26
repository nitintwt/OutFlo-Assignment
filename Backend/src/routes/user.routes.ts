import { fetchCampaign , allCampaigns , createCampaign , toggleStatus , deleteCampaign } from '../controllers/user.controller.js'
import {Router} from 'express'

const userRouter = Router()

userRouter.route("/campaigns").get(allCampaigns)
userRouter.route("/campaigns/:id").get(fetchCampaign)
userRouter.route("/campaigns").post(createCampaign)
userRouter.route("/campaigns/:id").put(toggleStatus)
userRouter.route("/campaigns/:id").delete(deleteCampaign)
//userRouter.route("/personalized-message").post()

export default userRouter