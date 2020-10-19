CREATE TABLE `SITE_DB`.`item_eventproposal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,

  -- `description` text NOT NULL DEFAULT '',
  `html` text NOT NULL DEFAULT '',

  `desired_start_time` time DEFAULT NULL,
  `desired_end_time` time DEFAULT NULL,
  `desired_part_of_week` int(11) DEFAULT 1,

  `event_attendance_mode` int(11) NOT NULL DEFAULT 1,
  `event_type` int(11) NULL DEFAULT NULL,
  `event_attendance_expectance` int(11) NULL DEFAULT NULL,
  `tickets` int(11) NULL DEFAULT NULL,
  `reoccurring` int(11) NULL DEFAULT NULL,

  `comment_from_host` text NOT NULL DEFAULT '',

  `terms` int(11) NULL DEFAULT NULL,

  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_eventproposal_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;