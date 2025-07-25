import React, { useState, useCallback } from 'react';
import YouTube from 'react-youtube';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FitnessCenter as ExerciseIcon,
  Timer as TimerIcon,
  TimerOff as RestIcon,
  Build as EquipmentIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Lightbulb as HintIcon,
  Today as TodayIcon,
  Event as EventIcon,
  DirectionsRun as WarmUpIcon,
  SelfImprovement as CoolDownIcon
} from '@mui/icons-material';
// Types for the workout plan JSON
interface Exercise {
  name: string;
  hint?: string;
  sets?: number;
  reps?: string;
  rest?: string;
  equipment?: string;
  duration?: string;
  youtube?: string;
  description?: string;
}

interface WorkoutActivity {
  name: string;
  description: string;
  duration?: string;
  reps?: number;
  youtube?: string;
}

interface WorkoutPlan {
  user_id: string;
  fitness_level: string;
  goal: string;
  day: number;
  workout: {
    date: string;
    day: string;
    workout_type: string;
    focus_area: string;
    exercises: Exercise[];
    duration: string;
    warm_up: {
      activities: WorkoutActivity[];
      total_duration: string;
    };
    cool_down: {
      activities: WorkoutActivity[];
      total_duration: string;
    };
    intensity: string;
    notes: string;
    today: string;
    tomorrow: string;
  };
  youtube_status: string;
}

interface Props {
  plan: WorkoutPlan;
  onClose?: () => void;
}

const SectionTitle: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box mr={1} display="flex" alignItems="center">
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
  </Box>
);

const WorkoutPlanViewer: React.FC<Props> = ({ plan, onClose }) => {
  // All hooks must be called unconditionally at the top level
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState<string | false>(false);
  const [videoStates, setVideoStates] = useState<{[key: number]: boolean}>({});
  
  // Early return after all hooks have been called
  if (!plan) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>No workout plan available</Typography>
      </Box>
    );
  }

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleVideo = (index: number) => {
    setVideoStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderExerciseCard = (exercise: Exercise, index: number) => {
    const showVideo = videoStates[index] || false;
    
    return (
      <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 1, width: '100%' }}>
        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="subtitle1" fontWeight="bold">{exercise.name}</Typography>
                {exercise.youtube && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo(index);
                    }}
                    sx={{ ml: 'auto' }}
                  >
                    <PlayIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              
              {exercise.hint && (
                <Box mb={1} display="flex" alignItems="flex-start">
                  <HintIcon fontSize="small" color="action" sx={{ mr: 1, mt: '2px' }} />
                  <Typography variant="body2" color="text.secondary">
                    {exercise.hint}
                  </Typography>
                </Box>
              )}
              
              <Box display="flex" flexWrap="wrap" gap={1} mt={1.5}>
                {exercise.sets !== undefined && (
                  <Chip size="small" label={`${exercise.sets} sets`} variant="outlined" />
                )}
                {exercise.reps && (
                  <Chip size="small" label={`${exercise.reps} reps`} variant="outlined" />
                )}
                {exercise.rest && (
                  <Chip
                    size="small"
                    icon={<RestIcon fontSize="small" />}
                    label={`Rest: ${exercise.rest}`}
                    variant="outlined"
                  />
                )}
                {exercise.equipment && (
                  <Chip
                    size="small"
                    icon={<EquipmentIcon fontSize="small" />}
                    label={exercise.equipment}
                    variant="outlined"
                  />
                )}
              </Box>
              
              {exercise.youtube && showVideo && (
                <Box mt={2}>
                  <YouTube
                    videoId={new URL(exercise.youtube).searchParams.get('v') || ''}
                    opts={{
                      width: '100%',
                      playerVars: {
                        autoplay: 0,
                        modestbranding: 1,
                      },
                    }}
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderActivityCard = (activity: WorkoutActivity, index: number) => {
    const [showVideo, setShowVideo] = React.useState(false);
    
    return (
      <Card key={index} sx={{ mb: 1, borderRadius: 2, boxShadow: 1 }}>
        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="subtitle2" fontWeight="bold">{activity.name}</Typography>
                {activity.youtube && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(!showVideo);
                    }}
                    sx={{ ml: 'auto' }}
                  >
                    <PlayIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" mb={1.5}>
                {activity.description}
              </Typography>
              
              <Box display="flex" gap={1} flexWrap="wrap">
                {activity.duration && (
                  <Chip
                    size="small"
                    icon={<TimerIcon fontSize="small" />}
                    label={activity.duration}
                    variant="outlined"
                  />
                )}
                {activity.reps && (
                  <Chip
                    size="small"
                    label={`${activity.reps} reps`}
                    variant="outlined"
                  />
                )}
              </Box>
              
              {activity.youtube && showVideo && (
                <Box mt={2}>
                  <YouTube
                    videoId={new URL(activity.youtube).searchParams.get('v') || ''}
                    opts={{
                      width: '100%',
                      playerVars: {
                        autoplay: 0,
                        modestbranding: 1,
                      },
                    }}
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title: string, items: WorkoutActivity[], icon: React.ReactNode, totalDuration?: string) => (
    <Accordion
      expanded={expanded === title}
      onChange={handleChange(title)}
      elevation={0}
      sx={{
        '&:before': { display: 'none' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" width="100%">
          <Box mr={1} display="flex" alignItems="center">
            {icon}
          </Box>
          <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
          {totalDuration && (
            <Chip 
              size="small" 
              label={totalDuration} 
              sx={{ ml: 'auto', mr: 1 }} 
              icon={<TimerIcon fontSize="small" />}
            />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item, index) => renderActivityCard(item, index))}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box maxWidth={'100%'} mx="auto" my={2} px={isMobile ? 1 : 4} position="relative">
      {onClose && (
        <IconButton 
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #3f51b5 0%, #1a237e 100%)',
          color: 'white',
          p: 3,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box position="absolute" right={16} top={16}>
            <Chip 
              label={plan.workout.intensity} 
              color="secondary" 
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {plan.workout.day} - {plan.workout.workout_type}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            <Chip 
              label={plan.workout.focus_area} 
              size="small" 
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
            />
            <Chip 
              icon={<TimerIcon fontSize="small" />}
              label={plan.workout.duration}
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Chip 
              label={`Intensity: ${plan.workout.intensity}`} 
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
          </Box>
        </Box>

        <CardContent>
          {/* Main Exercises */}
          {plan.workout.exercises && plan.workout.exercises.length > 0 && (
            <Box mb={3}>
              <SectionTitle 
                title="Main Exercises" 
                icon={<ExerciseIcon color="primary" fontSize="small" />} 
              />
              <Box mt={2}>
                {plan.workout.exercises.map((exercise, index) => renderExerciseCard(exercise, index))}
              </Box>
            </Box>
          )}

          {/* Warm Up Section */}
          {plan.workout.warm_up?.activities && plan.workout.warm_up.activities.length > 0 && (
            <Box mb={3}>
              {renderSection(
                'Warm Up', 
                plan.workout.warm_up.activities, 
                <WarmUpIcon />, 
                plan.workout.warm_up.total_duration
              )}
            </Box>
          )}

          {/* Cool Down Section */}
          {plan.workout.cool_down?.activities && plan.workout.cool_down.activities.length > 0 && (
            <Box mb={3}>
              {renderSection(
                'Cool Down', 
                plan.workout.cool_down.activities, 
                <CoolDownIcon />, 
                plan.workout.cool_down.total_duration
              )}
            </Box>
          )}
            
          {(plan.workout.notes || plan.workout.today || plan.workout.tomorrow) && (
            <Box mt={3}>
              <Card elevation={0} sx={{ backgroundColor: theme.palette.grey[50], p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Notes & Tips
                </Typography>
                {plan.workout.notes && (
                  <Typography variant="body2" paragraph>
                    {plan.workout.notes}
                  </Typography>
                )}
                {plan.workout.today && (
                  <Box mt={1}>
                    <Typography variant="body2" fontWeight="medium">Today's Focus:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.workout.today}
                    </Typography>
                  </Box>
                )}
                {plan.workout.tomorrow && (
                  <Box mt={1}>
                    <Typography variant="body2" fontWeight="medium">Up Next:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.workout.tomorrow}
                    </Typography>
                  </Box>
                )}
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkoutPlanViewer;
