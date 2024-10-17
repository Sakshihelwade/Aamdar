import React, { useEffect, useState } from 'react'
import Modal from '../../../components/ui/Modal'
import CommonTable from './CommonTable'
import SeleteFamilyMemberTable from './SelcteFamilyMemberTable'

const AddFamilyMember = ({addFamilyModal,handleFamilyModal,handelSelectedFamily}) => {

    const [familyData,setFamilyData]=useState()
//    console.log(familyData)

    const handelSetData=(val)=>{
        setFamilyData(val)
    }

    useEffect(()=>{
        handelSelectedFamily(familyData)
    },[familyData])

  return (
    <div>
     <Modal
                title="New Voter"
                activeModal={addFamilyModal}
                className='w-full'
                themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
                onClose={()=>handleFamilyModal(false)}
            >
<SeleteFamilyMemberTable  handelSetData={handelSetData} handleFamilyModal={handleFamilyModal} />
                </Modal>
    </div>
  )
}

export default AddFamilyMember
