import { useEffect, useState } from 'react'
import './App.css'
import { useVersion } from './contexts/version'
import { getAll, getChampion } from './services/champion'

import Modal from 'react-modal'
import {
  IChampionList,
  ICurrentChampion,
  ICurrentChampionSkins,
} from './interfaces'

Modal.setAppElement('#root')

const skillIndexToKeyboardCode: { [key: number]: string } = {
  0: 'Q',
  1: 'W',
  2: 'E',
  3: 'R',
}

function App() {
  const [champions, setChampions] = useState<IChampionList[]>([])
  const [isChampionModalOpen, setIsChampionModalOpen] = useState(false)
  const [currentChampion, setCurrentChampion] = useState<ICurrentChampion>(
    {} as ICurrentChampion,
  )
  const { version } = useVersion()

  useEffect(() => {
    localStorage.clear()
  }, [])

  useEffect(() => {
    if (version) {
      getAll({ version, locale: 'pt_BR' }).then((data) => {
        const formattedChampions = Object.keys(data).map((key) => data[key])
        setChampions(formattedChampions)
      })
    }
  }, [version])

  function handleOpenChampionModal(championName: string) {
    getChampion({ version, locale: 'pt_BR', championName }).then((data) => {
      Object.keys(data).map((key) => {
        setCurrentChampion(data[key])
      })
    })
    setIsChampionModalOpen(true)
  }

  function handleCloseChampionModal() {
    setIsChampionModalOpen(false)
  }

  return (
    <>
      <section className="champions-container">
        {champions.map((champion) => (
          <div
            key={champion.key}
            className="champion-card"
            onClick={() => handleOpenChampionModal(champion.id)}
          >
            <div className="image-container">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                loading="lazy"
                alt={`${champion.name} profile image`}
              />
            </div>
            <div className="champion-name">
              <p>{champion.name}</p>
            </div>
          </div>
        ))}
      </section>
      <Modal
        isOpen={isChampionModalOpen}
        onRequestClose={handleCloseChampionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        {Object.keys(currentChampion).length > 0 && (
          <>
            <div className="modal-header">
              <div className="champion-profile-image">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${currentChampion.image.full}`}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="modal-body">
              {Object.keys(currentChampion).length > 0 && (
                <>
                  <p>{currentChampion.name}</p>
                  <div>
                    <div>
                      <p>Classes</p>
                      <p>
                        {currentChampion.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Info</p>
                      <p>{currentChampion.info.attack}</p>
                      <p>{currentChampion.info.defense}</p>
                      <p>{currentChampion.info.difficulty}</p>
                      <p>{currentChampion.info.magic}</p>
                    </div>
                    <div>
                      <p>Spells</p>
                      <div>
                        <p>{currentChampion.passive.name}</p>
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${currentChampion.passive.image.full}`}
                          loading="lazy"
                        />
                        <p>{currentChampion.passive.description}</p>
                        <div>
                          <video
                            src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${currentChampion.key.padStart(
                              4,
                              '0',
                            )}/ability_${currentChampion.key.padStart(
                              4,
                              '0',
                            )}_P1.mp4`}
                            controls
                            preload="metadata"
                            muted={true}
                            style={{ width: '20%' }}
                          />
                        </div>
                      </div>
                      {currentChampion.spells.map((spell, index) => (
                        <div key={spell.name}>
                          <p>{spell.name}</p>
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                            loading="lazy"
                          />
                          <p>{spell.description}</p>
                          <div>
                            <video
                              src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${currentChampion.key.padStart(
                                4,
                                '0',
                              )}/ability_${currentChampion.key.padStart(
                                4,
                                '0',
                              )}_${skillIndexToKeyboardCode[index]}1.mp4`}
                              controls
                              preload="metadata"
                              muted={true}
                              style={{ width: '20%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p>Skins</p>
                      {currentChampion.skins.map(
                        (skin: ICurrentChampionSkins) => (
                          <div key={skin.id}>
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChampion.id}_${skin.num}.jpg`}
                              loading="lazy"
                              className="image-splash-art"
                            />
                            {skin.name === 'default'
                              ? currentChampion.name
                              : skin.name}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default App
