import { Flex, Link, Image } from '@chakra-ui/react'
import facebook from 'assets/icons/socials/facebook.svg'
import instagram from 'assets/icons/socials/instagram.svg'
import tiktok from 'assets/icons/socials/tiktok.svg'

const AppFooterMedia = () => {
  return (
    <Flex gap={4}>
      <Link
        href="https://www.facebook.com/profile.php?id=61569663662044&locale=uk_UA"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image src={facebook} alt="facebook"></Image>
      </Link>
      <Link
        href="https://www.instagram.com/neptunes.sushi/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image src={instagram} alt="instagram"></Image>
      </Link>
      <Link href="https://tiktok.com" target="_blank" rel="noreferrer noopener">
        <Image src={tiktok} alt="tiktok"></Image>
      </Link>
    </Flex>
  )
}

export default AppFooterMedia
