import React, { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'

export const useUpdateUserName = () => {
    const {selector} = useRedux()
    const {getValue} = useSession()
    const {profileEdit} = selector(state => state.data)
    const [username, setUsername] = useState<string | undefined>("")

    useEffect(() => {
        setTimeout(() => {
            setUsername(getValue() && getValue().level || getValue().level === 0 ? getValue().data.aName :  getValue().name)
        },500)
      },[profileEdit, getValue()])

      return { username }
}
