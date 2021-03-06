import { MissionFeedCardPropsBase } from './mission-feed-card/MissionFeedCard';
import parseUnixTimestamp from '../shared/utils/parse-unix-timestamp';

/**
 * @description Schema for what a previous mission looks like when returned from
 * SpaceX API
 */
type PreviousMissionFromApi = {
  mission_name: string,
  details: string,
  id: string,
  launch_date_unix: number
};

/**
 * @description Helper function used at the app level for getting the
 * number of missions the history pg should show; it's a simple wrapper
 * for simple logic that can now be tested
 */
export function getNumberOfVisibleMissions(
  currentVisible: number,
  totalMissions: number
) {
  const currentWithTwentyMore = currentVisible + 20;
  return currentWithTwentyMore < totalMissions ? currentWithTwentyMore : totalMissions;
}

/**
 * @description Complement for function below;
 * it takes in an object from back-end api, and
 * spits out an object formatted according to the
 * requirements/interface needed
 */
export function parseMission(
{
  mission_name,
  details,
  id,
  launch_date_unix
}: PreviousMissionFromApi,
detailsFieldText: string,
dateFieldText: string,
readMoreText: string
): MissionFeedCardPropsBase {
  return {
    missionName: mission_name,
    missionDate: { name: dateFieldText, value: parseUnixTimestamp(launch_date_unix)},
    missionDetails: { name: detailsFieldText, value: details ? details : '' },
    missionId: parseInt(id),
    readMoreText
  };
}

/**
 * @description Function used to iterate through
 * data from back-end API and call the function above
 * for each
 */
export function parsePreviousMissions(
  previousMissions: PreviousMissionFromApi[],
  detailsFieldText: string,
  dateFieldText: string,
  readMoreText: string
): MissionFeedCardPropsBase[] {
  return previousMissions.map((mission: PreviousMissionFromApi): MissionFeedCardPropsBase => parseMission(mission, detailsFieldText, dateFieldText, readMoreText));
}