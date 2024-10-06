// Chakra imports
import {
  Box, Icon, SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { Controller } from 'Controller/Controller';
import { useEffect, useState } from 'react';
import {
  AiOutlinePercentage, AiOutlineUser
} from "react-icons/ai";
import {
  MdAttachMoney
} from "react-icons/md";
import MembershipToExipre from "views/admin/default/components/MembershipToExipre";
import RecentlyActiveMembers from 'views/admin/default/components/RecentlyActiveMembers';
import UrgentNotification from 'views/admin/default/components/UrgentNotification';
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieCard from "views/admin/default/components/PieCard";


export default function UserReports() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [data, setData] = useState({
    mmr: "",
    member: "",
    mom: "",
    //recentlyActive: [],
  })

  const getData = async () => {
    const mmr = await Controller.GetMRR();
    const mom = await Controller.GetMOM();
    const member = await Controller.TotalMembers();
    console.log("xa")
    setData({
      mmr: mmr.json.results,
      member: member.json.Total_Members,
      mom: mom.json.mom,
    })
    console.log(mmr.json)
    console.log(mom.json)
    console.log(member.json)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={1}
        gap='20px'
        mb='20px'>
        {/* <UrgentNotification /> */}
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={AiOutlineUser} color={brandColor} />
              }
            />
          }
          name='Total Members'
          value={data.member ? data.member : "-"}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='MRR'
          value={data.mmr ? "$ " + data.mmr : "-"}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={AiOutlinePercentage} color={brandColor} />
              }
            />
          }
          name='MoM Growth'
          value={data.mom ? data.mom.toFixed(2) + " %" : "-%"}
        />

      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>

        <TotalSpent />
        <PieCard />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <RecentlyActiveMembers />
        <MembershipToExipre />
      </SimpleGrid>
    </Box>
  );
}
