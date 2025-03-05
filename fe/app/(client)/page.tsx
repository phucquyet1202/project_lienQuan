import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/client/icons";
import Banner from "@/components/client/banner/layOut";
import ListSubCate from "@/components/client/cusstomCard/listSubCate";

export default function Home() {
  return (
    <>
      <Banner />
      <ListSubCate />
    </>
  );
}
