import { wrap } from "@/helper";
import router from ".";
import { verify } from "@/middlewares/auth";
import { get, post } from "@/controller/auth";

const basePath = "/auth";

router.post(basePath + "/post", verify, wrap(post));
router.get(basePath + "/get", verify, wrap(get));
